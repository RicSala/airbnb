import { useRouter } from "next/navigation"
import { UiContext } from "../contexts/ui/UiProvider"
import { useContext, useCallback, useMemo } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"



const useFavorite = ({
    listingId,
    currentUser,
}) => {

    const router = useRouter()
    const { onOpenLoginModal } = useContext(UiContext)

    // why do we use useMemo here? => so we don't have to recalculate the value every time the component re-renders
    // could be heavy because of the includes() method
    const hasFavorited = useMemo(() => {
        return currentUser?.favoriteIds?.includes(listingId)
    }, [currentUser, listingId])


    const toggleFavorite = useCallback(async (event) => {
        event.stopPropagation()

        console.log("toggleFavorite", currentUser)

        if (!currentUser) return onOpenLoginModal()

        try {
            let request

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            console.log("request", request)

            await request()
            console.log("request2", request)
            router.refresh()
            toast.success('Favorito actualizado!')

        } catch (error) {
            toast.error("Algo fue mal 😢 · Inténtalo de nuevo")
        }
    }
        , [currentUser, hasFavorited, listingId, onOpenLoginModal, router])

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite;
