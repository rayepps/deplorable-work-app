import { useState } from 'react'
import {
  Pane,
  Heading,
  Paragraph,
  TextInputField,
  TextareaField,
  Image,
  FormField,
  toaster,
  Button,
  majorScale
} from 'evergreen-ui'
import * as yup from 'yup'
import { Stack, Center, Split } from '../layout'
import * as t from '../../types'
import theme from 'src/styles'
import Header from 'src/components/ui/Header'
import Footer from 'src/components/ui/Footer'
import ImageUploading, { ImageType } from 'react-images-uploading'
import { useFormation } from 'src/hooks/useFormation'
import { useBreakpoint } from 'src/hooks/useBreakpoint'
import { useFetch } from 'src/hooks/useFetch'
import { useAjax } from 'src/hooks/useAjax'
import api from 'src/api'
import { useRouter } from 'next/router'
import JobListItem from 'src/components/ui/JobListItem'


export default function PostJobScene() {

  const router = useRouter()
  const bp = useBreakpoint()
  const submitJobRequest = useFetch(api.jobs.submit)
  const uploadImageRequest = useAjax(api.assets.uploadAsset)

  const createJobPost = async (data: {
    title: string
    location: string
    companyName: string
    description: string
    link: string
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
    const { error } = await submitJobRequest.fetch({
      ...data,
      thumbnailId: assetId
    })
    if (error) {
      console.error(error)
      toaster.danger(error.details)
      return
    }
    router.push('/jobs')
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
              Post a Job
            </Heading>
            <Paragraph
              maxWidth={550}
              size={500}
              lineHeight='1.8em'
            >
              If you're new here be sure to check out our home page and values. If you're a company that shares
              our values please post your jobs, its free!
            </Paragraph>
          </Pane>
          <JobForm
            onSubmit={createJobPost}
            loading={submitJobRequest.loading || uploadImageRequest.loading}
          />
        </Pane>
      </Center>
      <Footer />
    </>
  )
}

const JobForm = ({
  loading = false,
  onSubmit
}: {
  loading?: boolean
  onSubmit?: (form: {
    title: string
    location: string
    companyName: string
    description: string
    link: string
    thumbnailFile: File | null
  }) => void
}) => {

  const [image, setImage] = useState<ImageType | null>(null)
  const form = useFormation({
    title: yup.string().required().min(1, 'Field cannot be empty'),
    location: yup.string().required().min(1, 'Field cannot be empty'),
    companyName: yup.string().required().min(1, 'Field cannot be empty'),
    description: yup.string().required().min(1, 'Field cannot be empty'),
    link: yup.string().required().test('link', 'Invalid url format', (value: any) => {
      try {
        new URL(value)
      } catch (_) {
        return false
      }
      return true
    })
  }, {
    title: '',
    location: '',
    companyName: '',
    description: '',
    link: ''
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
        label='Title'
        placeholder='Part Time Nurse Practitioner'
        description={`
          This is the first thing job seekers will see. Keep it short and sweet.
        `}
        {...register('title')}
      />
      <TextareaField
        required
        label='Description'
        placeholder={`We are seeking a motivated Nurse Practitioner to join our new clinic, opening early 2022. We are hiring team players who want to elevate and inspire our patients to optimal health and wellness with our treatments and healthy lifestyle strategies.`}
        description={`
          Any more information you would like to provide. You can leave this empty
          and link candidates to an existing page below.
        `}
        {...register('description')}
      />
      <TextInputField
        required
        label='Company'
        placeholder='Complete Practice Solutions'
        description={`
          What is the name of the company?
        `}
        {...register('companyName')}
      />
      <TextInputField
        required
        label='Location'
        placeholder='Irvine, CA'
        description={`
          Where will workers be doing the job?
        `}
        {...register('location')}
      />
      <TextInputField
        required
        label='Link'
        placeholder='https://jobs.com/link/to/job'
        description={`
          Provide a link to a page with all the job details.
        `}
        {...register('link')}
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
        <JobListItem
          marginTop={majorScale(1)}
          job={{
            id: 'x',
            title: form.values.title,
            location: form.values.location,
            link: form.values.link,
            createdAt: new Date().toISOString(),
            company: {
              name: form.values.companyName
            },
            thumbnail: {
              url: image?.data_url
            }
          } as t.Job}
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