import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Contact() {
    return (
        <div className="mx-auto px-6 text-center">
            <div className="container mx-auto">
                <div className="w-full items-center space-x-2">
                    <div className="space-y-4">
                        <Input type="text" placeholder="Name" className="w-full p-2 border rounded" />
                        <Input type="email" placeholder="Email Address" className="w-full p-2 border rounded" />
                        <Textarea placeholder="Commentaire" />
                        <Button className="w-full">Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
