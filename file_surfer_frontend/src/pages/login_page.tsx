import { route } from "preact-router"
import { useContext, useState } from "preact/hooks"
import { BiHide, BiShow, BiUserCircle } from "react-icons/bi"
import { AuthService } from "../generated-sources/openapi"
import { FunctionalComponent } from "preact";
import { effect } from "@preact/signals";
import { TokenContext } from "../auth/tokenSignal";

export const LoginPage: FunctionalComponent = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [hidden, setHidden] = useState(true)

  const token = useContext(TokenContext)

  effect(() => {
    if (token.value !== null) {
      route("/browse/")
    }
  })

  const submit = async (e: Event) => {
    e.preventDefault()
    const result = await AuthService.postLogin({ username, password })
    if (result?.token !== undefined) {
      token.value = result.token

    }
  }


  return (
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg">
        <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          File Surfer
        </h1>

        <form onSubmit={submit} class="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
          <p class="text-lg font-medium">Sign in to your account</p>

          <div>
            <label for="username" class="text-sm font-medium">Username</label>

            <div class="relative mt-1">
              <input
                type="text"
                id="username"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter email"
                value={username}
                onChange={e => setUsername((e.target as HTMLInputElement).value)}
              />

              <span class="absolute inset-y-0 right-4 inline-flex items-center">
                <BiUserCircle size="24px" />
              </span>
            </div>
          </div>

          <div>
            <label for="password" class="text-sm font-medium">Password</label>

            <div class="relative mt-1">
              <input
                type={hidden ? "password" : "text"}
                id="password"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword((e.target as HTMLInputElement).value)}
              />

              <span
                onClick={_ => setHidden(!hidden)}
                class="absolute inset-y-0 right-4 inline-flex items-center">
                {hidden ? <BiHide size="24px" /> : <BiShow size="24px" />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>

  )
}