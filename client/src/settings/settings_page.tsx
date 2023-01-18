import { useSignal } from "@preact/signals"
import { FunctionComponent } from "preact"
import { FC } from "preact/compat"
import { useEffect } from "preact/hooks"
import { BiEdit } from "react-icons/bi"
import { useGuard } from "../auth/useGuard"
import { SmallSecondaryButton } from "../components/buttons"
import { User, UserService } from "../generated-sources/openapi"
import { SingleColumnLayout } from "../layout/single_column_layout"
import { ChangePass } from "./change_pass"

export const SettingsPage: FunctionComponent = () => {
  useGuard()
  const isAdmin = useSignal(false)
  const users = useSignal<User[]>([])

  useEffect(() => {
    UserService.getUserMe()
      .then(u => isAdmin.value = (u.role === "admin"))

    UserService.getUsers().then(res => {
      users.value = res
    })
  }, [])


  return (
    <SingleColumnLayout>
      <h1 class="font-bold text-xl mb-4">Settings</h1>
      <ChangePass />
      <h2 className="font-bold text-lg mb-2">Users</h2>
      {isAdmin.value &&
        <div class="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
          <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="bg-gray-100">
              <tr>
                <Th>ID</Th>
                <Th>Username</Th>
                <Th>Role</Th>
                <Th>Action</Th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              {users.value.map(u => (
                <tr key={u.id}>
                  <Td>{u.id}</Td>
                  <Td>{u.username}</Td>
                  <Td>{u.role}</Td>
                  <Td>
                    <SmallSecondaryButton>
                      <div className="flex flex-row items-center gap-2">
                        <BiEdit size="1rem" /> Edit
                      </div>
                    </SmallSecondaryButton>
                  </Td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      }
    </SingleColumnLayout>
  )
}

const Th: FC = ({ children }) => {
  return (
    <th
      class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
      <div class="flex items-center gap-2">
        {children}
      </div>
    </th>
  )
}

const Td: FC = ({ children }) => {
  return (
    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
      {children}
    </td>
  )
}