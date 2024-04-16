import { AxiosResponse, AxiosError } from "axios"
import { useQuery } from "react-query"
import { request } from "@utils/axios-util"

type PairItem = {
  name: string
  models: {
    model1: string
    model2: string
  }
}
type ResponseData = {
  list: string[]
  pairs: PairItem[]
}

export default function useModel() {
  const queryFn = () =>
    request({
      url: "/model/pairs",
      method: "get",
    })

  return useQuery(["fetch-models-api"], {
    queryFn,
    onError: (error: AxiosError) => {
      console.log(error)
    },
    select: (res: AxiosResponse): ResponseData => {
      return res.data
    },
  })
}
