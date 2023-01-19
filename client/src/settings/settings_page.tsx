import { useSignal } from "@preact/signals"
import { FC } from "preact/compat"
import { useEffect } from "preact/hooks"
import { withGuard } from "../auth/Guard"

import { UserService } from "../generated-sources/openapi"
import { SingleColumnLayout } from "../layout/single_column_layout"
import { ChangePass } from "./change_pass"
import { UserTable } from "./user_table"

enum SettingsTab {
  changePass,
  userTable
}

export const SettingsPage = withGuard(() => {

  const isAdmin = useSignal(false)
  const tab = useSignal(SettingsTab.changePass)

  useEffect(() => {
    UserService.getUserMe()
      .then(u => isAdmin.value = (u.role === "admin"))
  }, [])


  return (
    <SingleColumnLayout>
      <h1 class="font-bold text-xl mb-4">Settings</h1>

      <Tabs>
        <Tab active={tab.value === SettingsTab.changePass}
          onClick={() => tab.value = SettingsTab.changePass}>
          Change Password
        </Tab>
        {isAdmin.value &&
          <Tab active={tab.value === SettingsTab.userTable}
            onClick={() => tab.value = SettingsTab.userTable}>
            Users
          </Tab>
        }
      </Tabs>

      {tab.value === SettingsTab.changePass && <ChangePass />}

      {isAdmin.value && <>
        {tab.value === SettingsTab.userTable &&
          <UserTable />
        }
      </>}
    </SingleColumnLayout>
  )
})

const Tabs: FC = ({ children }) => (
  <ul class="flex border-b border-gray-200 text-center mb-8">
    {children}
  </ul>
)

const Tab: FC<{ active: boolean, onClick: () => void }> = ({ active, children, onClick }) => {
  if (active) {
    return (
      <li class="flex-1">
        <a
          class="relative block border-t border-l border-r border-gray-200 bg-white p-4 text-sm font-medium"
          onClick={onClick}
        >
          <span class="absolute inset-x-0 -bottom-px h-px w-full bg-white" />
          {children}
        </a>
      </li>
    )
  }

  return (
    <li class="flex-1">
      <a class="block p-4 text-sm font-medium text-gray-500"
        onClick={onClick}
      >
        {children}
      </a>
    </li>
  )
}