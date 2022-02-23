import SendButton from '../../components/sendButton'
import styles from './styles.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

const SuccessPanel = () => {

    const router = useRouter()

    const reloadPage = () => {
        router.reload()
    }

    return (
        <>
        <Image
          src={'/computer.png'}
          width={'300px'}
          height={'300px'}
          alt={'Computador do Futuro'}
        />
        <div className={styles.successMessage}>Sua carta foi enviada com sucesso para o futuro!</div>
        <SendButton onClick={e => reloadPage()} variant="contained" size="large"><b>ENVIAR OUTRA CARTA</b></SendButton>
      </>
    )
}

export default SuccessPanel