import { useQuery } from "@chakra-ui/react"
import { UserService } from '../../services/user.service';

export const useProfile = () => {
    const { data } = useQuery(['profile'], () => UserService.getProfile())

    return { user: data }
}