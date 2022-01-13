import { useState } from 'react'
import {
  Pane,
  Text,
  Heading,
  Paragraph,
  Link as EvergreenLink,
  TextInputField,
  Image,
  FormField,
  TextareaField,
  toaster,
  Button,
  majorScale
} from 'evergreen-ui'
import * as yup from 'yup'
import { Stack, Center, Split } from '../layout'
import * as t from '../../types'
import theme from 'src/styles'
import Breakpoint from 'src/components/ui/Breakpoint'
import Header from 'src/components/ui/Header'
import Footer from 'src/components/ui/Footer'
import ImageUploading, { ImageType } from 'react-images-uploading'
import { HiCheck, HiMinus, HiX } from 'react-icons/hi'
import { useFormation } from 'src/hooks/useFormation'
import { useBreakpoint } from 'src/hooks/useBreakpoint'
import { useFetch } from 'src/hooks/useFetch'
import { useAjax } from 'src/hooks/useAjax'
import WorkerGrid from 'src/components/ui/WorkerGrid'
import api from 'src/api'
import { useRouter } from 'next/router'
// import JobListItem from 'src/components/ui/JobListItem'


export default function PostCandidateScene() {

  const router = useRouter()
  const bp = useBreakpoint()
  const submitWorkerRequest = useFetch(api.workers.submit)
  const uploadImageRequest = useAjax(api.assets.uploadAsset)

  const createJobPost = async (data: {
    name: string
    desiredRole: string
    description: string
    thumbnailFile: File | null
  }) => {
    let assetId: string | null = null
    if (data.thumbnailFile) {
      const [err, res] = await uploadImageRequest.fetch(data.thumbnailFile)
      if (err) {
        console.error(err)
        toaster.danger('Failed to upload your image. Try again or use a smaller image')
        return
      }
      assetId = res.assetId
    }
    const { error } = await submitWorkerRequest.fetch({
      ...data,
      thumbnailId: assetId
    })
    if (error) {
      console.error(error)
      toaster.danger('Something wen\'t wrong creating your candidate post.')
      return
    }
    router.push('/candidates')
  }

  return (
    <>
      <Header />
      <Center
        paddingY={majorScale(20)}
        paddingX={bp.at('medium', 'up') ? majorScale(10) : majorScale(4)}
      >
        <Pane
          width='100%'
          maxWidth={600}
        >
          <Pane
            marginBottom={majorScale(6)}
          >
            <Heading
              is='h1'
              size={900}
              fontFamily={theme.fonts.vollkorn}
              marginBottom={majorScale(2)}
            >
              Post a Candidate Profile
            </Heading>
            <Paragraph
              maxWidth={550}
              size={500}
              lineHeight='1.8em'
            >
              If you're new here be sure to check out our home page and values. If you
              share our values please post your candidate profile, its free!
            </Paragraph>
          </Pane>
          <CandidateForm
            onSubmit={createJobPost}
            loading={submitWorkerRequest.loading || uploadImageRequest.loading}
          />
        </Pane>
      </Center>
      <Footer />
    </>
  )
}

const CandidateForm = ({
  loading = false,
  onSubmit
}: {
  loading?: boolean
  onSubmit?: (form: {
    name: string
    desiredRole: string
    description: string
    thumbnailFile: File | null
  }) => void
}) => {

  const [image, setImage] = useState<ImageType | null>(null)
  const form = useFormation({
    name: yup.string().required().min(1, 'Field cannot be empty'),
    desiredRole: yup.string().required().min(1, 'Field cannot be empty'),
    description: yup.string().required().min(1, 'Field cannot be empty')
  }, {
    name: '',
    desiredRole: '',
    description: ''
  })

  const register = (name: t.ArgumentTypes<typeof form.register>[0]) => ({
    ...form.register(name),
    validationMessage: form.errors[name]?.message
  })

  const onImageChange = (images: ImageType[]) => {
    if (!images || images.length === 0) {
      setImage(null)
    }
    setImage(images[0])
  }

  const handleSubmit = async () => {
    const isValid = await form.trigger()
    if (!isValid) return
    onSubmit?.({
      ...form.values,
      thumbnailFile: image ? (image.file ?? null) : null
    })
  }

  return (
    <>
      <TextInputField
        required
        label='Name'
        placeholder='Sarah Patten'
        description={`
          What is your name?
        `}
        {...register('name')}
      />
      <TextInputField
        required
        label='Role'
        placeholder='Sr. Software Engineer'
        description={`
          What type of role are you looking for?
        `}
        {...register('desiredRole')}
      />
      <TextareaField
        required
        label='Description'
        placeholder={`Builder, creator, lover of small teams, startups, and designing products from the ground up — full stack engineer. 9 years of experience with javascript and Typescript. Email me at sarah_patten@gmail.com`}
        description={`
          Any more information you would like to provide.
        `}
        {...register('description')}
      />
      <FormField
        label='Image'
        description={`
          Select an image to be used in your post.
        `}
      >
        <ImageUploading
          value={image ? [image] : []}
          onChange={onImageChange}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <Pane className="upload__image-wrapper">
              {imageList.length === 0 && (
                <Button
                  color={isDragging ? theme.colors.danger : theme.colors.black}
                  backgroundImage={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`}
                  onClick={onImageUpload}
                  boxShadow={undefined}
                  padding={majorScale(4)}
                  border='none'
                  appearance='minimal'
                  {...dragProps}
                >
                  Click or Drop Image Here
                </Button>
              )}
              {imageList.map((image, index) => (
                <Pane key={index} className="image-item">
                  <Image
                    marginBottom={majorScale(2)}
                    src={image['data_url']}
                    alt=""
                    width="150px"
                  />
                  <Pane className="image-item__btn-wrapper">
                    <Button
                      onClick={() => onImageUpdate(index)}
                      appearance='minimal'
                      marginRight={majorScale(2)}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => onImageRemove(index)}
                      appearance='minimal'
                      intent='danger'
                    >
                      Remove
                    </Button>
                  </Pane>
                </Pane>
              ))}
            </Pane>
          )}
        </ImageUploading>
      </FormField>
      <FormField
        marginTop={majorScale(4)}
        label='Preview'
      >
        <WorkerGrid
          workers={[{
            id: 'x',
            name: form.values.name,
            desiredRole: form.values.desiredRole,
            description: form.values.description,
            createdAt: new Date().toISOString(),
            thumbnail: {
              url: image?.data_url
            }
          } as t.Worker]}
        />
      </FormField>
      <Split
        justifyContent='flex-end'
        marginTop={majorScale(4)}
      >
        <Button
          disabled={loading || !form.isDirty}
          isLoading={loading}
          appearance='primary'
          onClick={handleSubmit}
        >
          Create
        </Button>
      </Split>
    </>
  )
}