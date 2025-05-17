
import { useState, useRef, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useNavigate, useLocation } from "react-router-dom"

const tabs = [
  { name: "Dashboard", path: "/" },
  { name: "Datasets", path: "/dataset-management" },
  { name: "Analysis", path: "/analysis" },
  { name: "Maps", path: "/interactive-map" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/user-profile" }
]

export function TabNavigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])
  const navigate = useNavigate()
  const location = useLocation()

  // Set active tab based on current path
  useEffect(() => {
    const currentPath = location.pathname
    const index = tabs.findIndex(tab => 
      currentPath === tab.path || 
      (tab.path !== "/" && currentPath.startsWith(tab.path))
    )
    if (index !== -1) {
      setActiveIndex(index)
    }
  }, [location.pathname])

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex])

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeIndex])

  useEffect(() => {
    requestAnimationFrame(() => {
      const overviewElement = tabRefs.current[0]
      if (overviewElement) {
        const { offsetLeft, offsetWidth } = overviewElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    })
  }, [])

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    navigate(tabs[index].path)
  }

  return (
    <Card className={`w-full max-w-[1200px] h-[100px] border-none shadow-none relative flex items-center justify-center ${isDarkMode ? "bg-transparent" : ""}`}>
      <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={toggleDarkMode}>
        {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      </Button>
      <CardContent className="p-0">
        <div className="relative">
          {/* Hover Highlight */}
          <div
            className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center"
            style={{
              ...hoverStyle,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          />

          {/* Active Indicator */}
          <div
            className="absolute bottom-[-6px] h-[2px] bg-[#0e0f11] dark:bg-white transition-all duration-300 ease-out"
            style={activeStyle}
          />

          {/* Tabs */}
          <div className="relative flex space-x-[6px] items-center">
            {tabs.map((tab, index) => (
              <div
                key={index}
                ref={(el) => (tabRefs.current[index] = el)}
                className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                  index === activeIndex ? "text-[#0e0e10] dark:text-white" : "text-[#0e0f1199] dark:text-[#ffffff99]"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleTabClick(index)}
              >
                <div className="text-sm font-medium leading-5 whitespace-nowrap flex items-center justify-center h-full">
                  {tab.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TabNavigation;
