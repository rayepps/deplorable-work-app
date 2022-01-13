import api from '@exobase/client-builder'
import * as t from './types'
import config from './config'


const uploadAsset = (url: string, token: string) => async (file: File): Promise<{ assetId: string }> => {
  const form = new FormData()
  form.append('fileUpload', file)
  const response = await fetch(`${url}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: form
  })
  const body = await response.json()
  return {
    assetId: body.id    
  }
}

const createApi = (url: string) => {
  const endpoint = api(url)
  return {
    jobs: {
      submit: endpoint<{
        title: string
        location: string
        link: string
        description: string
        companyName: string
        thumbnailId: string | null
      }, {
        job: t.Job
      }>({
        module: 'jobs',
        function: 'submit'
      }),
      list: endpoint<{
        pageSize: number
        page: number
      }, {
        jobs: t.Job[]
      }>({
        module: 'jobs',
        function: 'list'
      }),
    },
    workers: {
      submit: endpoint<{
        name: string
        desiredRole: string
        description: string
        thumbnailId: string | null
      }, {
        worker: t.Worker
      }>({
        module: 'workers',
        function: 'submit'
      }),
      list: endpoint<{
        pageSize: number
        page: number
      }, {
        workers: t.Worker[]
      }>({
        module: 'workers',
        function: 'list'
      }),
    },
    assets: {
      uploadAsset: uploadAsset(config.graphCmsUrl, config.graphCmsPublicToken)
    }
  }
}

export type Api = ReturnType<typeof createApi>

export default createApi(config.apiUrl)