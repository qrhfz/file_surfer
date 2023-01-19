import { useSignal } from "@preact/signals";
import { FC, useEffect } from "preact/compat";
import { BiEdit } from "react-icons/bi";
import { SmallSecondaryButton } from "../components/buttons";
import { User, UserService } from "../generated-sources/openapi";

export const UserTable: FC = () => {
  const users = useSignal<User[]>([])

  useEffect(() => {
    UserService.getUsers().then(res => {
      users.value = res
    })
  }, [])
  return (<>
    <h2 className="font-bold text-lg mb-4">Users</h2>
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
                    <BiEdit size="16px" /> Edit
                  </div>
                </SmallSecondaryButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
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