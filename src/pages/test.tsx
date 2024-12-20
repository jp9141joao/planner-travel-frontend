import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"

export function Test(){
    return (
        <>
        <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }}
    >
      Show Toast
    </Button>
                                    <Toaster />
        </>
    
    )
}