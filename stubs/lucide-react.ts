/**
 * Lightweight stub for lucide-react icons
 * Returns placeholder SVG components for all icon imports
 */
import * as React from "react"

type SVGProps = React.SVGProps<SVGSVGElement>

// Create a placeholder icon component
function createIcon(name: string) {
  return React.forwardRef<SVGSVGElement, SVGProps>(function Icon(props, ref) {
    const { width = 24, height = 24, className = "", ...rest } = props

    return React.createElement("svg", {
      ref,
      "data-icon": name,
      width,
      height,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      ...rest,
    })
  })
}

// Export all the icons used in the app
export const ShoppingCart = createIcon("ShoppingCart")
export const User = createIcon("User")
export const Menu = createIcon("Menu")
export const X = createIcon("X")
export const Search = createIcon("Search")
export const Heart = createIcon("Heart")
export const Package = createIcon("Package")
export const Settings = createIcon("Settings")
export const LogOut = createIcon("LogOut")
export const Star = createIcon("Star")
export const Plus = createIcon("Plus")
export const Minus = createIcon("Minus")
export const Trash2 = createIcon("Trash2")
export const Edit = createIcon("Edit")
export const Eye = createIcon("Eye")
export const EyeOff = createIcon("EyeOff")
export const Mail = createIcon("Mail")
export const Lock = createIcon("Lock")
export const Phone = createIcon("Phone")
export const MapPin = createIcon("MapPin")
export const Calendar = createIcon("Calendar")
export const Clock = createIcon("Clock")
export const Check = createIcon("Check")
export const AlertCircle = createIcon("AlertCircle")
export const Info = createIcon("Info")
export const ChevronDown = createIcon("ChevronDown")
export const ChevronUp = createIcon("ChevronUp")
export const ChevronLeft = createIcon("ChevronLeft")
export const ChevronRight = createIcon("ChevronRight")
export const Filter = createIcon("Filter")
export const Grid = createIcon("Grid")
export const List = createIcon("List")
export const Upload = createIcon("Upload")
export const Download = createIcon("Download")
export const Share = createIcon("Share")
export const Copy = createIcon("Copy")
export const ExternalLink = createIcon("ExternalLink")
export const Home = createIcon("Home")
export const Users = createIcon("Users")
export const BarChart = createIcon("BarChart")
export const TrendingUp = createIcon("TrendingUp")
export const DollarSign = createIcon("DollarSign")
export const CreditCard = createIcon("CreditCard")
export const Truck = createIcon("Truck")
export const Shield = createIcon("Shield")
export const Award = createIcon("Award")
export const Tag = createIcon("Tag")
export const Percent = createIcon("Percent")
export const Image = createIcon("Image")
export const FileText = createIcon("FileText")
export const Save = createIcon("Save")
export const RefreshCw = createIcon("RefreshCw")
export const MoreHorizontal = createIcon("MoreHorizontal")
export const MoreVertical = createIcon("MoreVertical")

// Default export for any other icons
const LucideProxy = new Proxy(
  {},
  {
    get: (_target, prop: string) => {
      if (typeof prop === "string") {
        return createIcon(prop)
      }
      return undefined
    },
  },
)

export default LucideProxy
