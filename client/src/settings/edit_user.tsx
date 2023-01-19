import { FC, useContext, useEffect, useRef } from "preact/compat";
import { PopupContext } from "../components/popup/popup_state";
import { Role, UserService } from "../generated-sources/openapi";

export const EditUser: FC<{ id?: string }> = ({ id }) => {
  const popup = useContext(PopupContext)

  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const role = useRef<HTMLSelectElement>(null)
  const base = useRef<HTMLInputElement>(null)
  const write = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (id === undefined) {
      return
    }
    UserService.getUser(id).then(u => {
      username.current!.value = u.username
      role.current!.value = u.role
      base.current!.value = u.base
      write.current!.checked = u.write
    })
  }, [])

  const submit = async (e: Event) => {
    e.preventDefault()
    if (id === undefined) {
      return
    }

    try {
      await UserService.patchUser(id, {
        username: username.current?.value,
        role: role.current?.value as Role,
        base: base.current?.value,
        write: write.current?.checked,
      })

      popup.show(<>Edit Sucess! 👍</>)
    } catch (error) {
      popup.show(<>Edit Error! ⚠️</>)
    }

  }

  return (
    <>
      <h2 className="font-bold text-lg mb-4">Edit Use</h2>
      <form onSubmit={submit} class="myform">
        <div class="myform-item">
          <label class="myform-label" htmlFor="username">Username</label>
          <div class="myform-input">
            <input class="w-full" type="text" id="username" ref={username} />
          </div>
        </div>
        <div class="myform-item">
          <label class="myform-label" htmlFor="password">Password</label>
          <div class="myform-input">
            <input class="w-full" type="text" id="password" ref={password} />
          </div>
        </div>
        <div class="myform-item">
          <label class="myform-label" htmlFor="role">Role</label>
          <div class="myform-input">
            <select id="role" ref={role} >
              <option value="admin">Admin</option>
              <option value="basic">Basic</option>
            </select>
          </div>
        </div>
        <div class="myform-item">
          <label class="myform-label" htmlFor="base">Base</label>
          <div class="myform-input">
            <input class="w-full" type="text" id="base" ref={base} />
          </div>
        </div>
        <div class="myform-item">
          <label class="myform-label" htmlFor="write">Write Access?</label>
          <div class="myform-input" >
            <input type="checkbox" id="write" ref={write} />
          </div>
        </div>
        <div className="myform-actions">
          <button type="submit" class="btn btn-primary btn-sm">Save</button>
        </div>
      </form>
    </>
  )
}