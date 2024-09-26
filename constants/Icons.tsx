import { Ionicons } from "@expo/vector-icons";

interface IIcon {
  [key: string] : ({ color, focused }: { color: string; focused: boolean; }) => React.JSX.Element
  index: ({ color, focused }: { color: string; focused: boolean; }) => React.JSX.Element
  discover: ({ color, focused }: { color: string; focused: boolean; }) => React.JSX.Element
  saved: ({ color, focused }: { color: string; focused: boolean; }) => React.JSX.Element
  settings: ({ color, focused }: { color: string; focused: boolean; }) => React.JSX.Element
}

export const icon:IIcon = {
  index: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="home" size={24} color={color} />
    ) : (
      <Ionicons name="home-outline" size={24} color={color} />
    ),
  discover: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="compass" size={25} color={color} />
    ) : (
      <Ionicons name="compass-outline" size={25} color={color} />
    ),
  saved: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="bookmarks" size={22} color={color} />
    ) : (
      <Ionicons name="bookmarks-outline" size={22} color={color} />
    ),
  settings: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="settings" size={24} color={color} />
    ) : (
      <Ionicons name="settings-outline" size={24} color={color} />
    ),
};
