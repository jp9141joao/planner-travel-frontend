import { PlaceSuggestions } from "@/components/PlaceSuggestions"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"

export function Test(){
    return (
        <div className="mx-4">
          <PlaceSuggestions/>
        </div> 
    )
}