import { UserButton } from "@clerk/clerk-react"

export default function Header(){
    return(
        <header className="top-0 z-50 w-full backdrop-blur-md fixed">
            <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="md:hidden"></div>
                <h2 className="text-xl font-bold">Favicon<span className="text-indigo-600">Maker</span></h2>
                <div className="flex items-center gap-2">
                    <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                userButtonAvatarBox: "w-8 h-8",
                                userButtonTrigger: "focus:shadow-none"
                            }
                        }}
                    />
                </div>
            </div>
        </header>
    )
}