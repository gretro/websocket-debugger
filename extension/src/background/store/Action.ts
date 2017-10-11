export type Action<TPayload = void, TMeta = any> = {
  type: string
  error?: boolean
  payload?: TPayload
  meta?: TMeta
}
