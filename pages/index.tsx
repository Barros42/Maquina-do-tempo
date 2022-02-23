import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Settings from '../core/settings'
import { TextField, TextFieldProps } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import DateFnsUtils from '@date-io/date-fns'
import brLocale from 'date-fns/locale/pt-BR'
import { addDays } from 'date-fns'
import { v4 } from 'uuid'
import LetterDTO from '../dto/Letter.dto'
import LetterValidator from '../validators/letterValidator'
import SendLetterUseCase from '../useCases/sendLetterUseCase'
import SendButton from '../components/sendButton'
import SuccessPanel from '../partial/SuccessPanel'
import SendLetterUseCaseInput from '../useCases/sendLetterUseCaseInput'
import QuillNoSSRWrapper from '../components/quillWrapper'

const Home: NextPage = () => {

  const today = new Date();
  const letterId = v4()
  const minDate = addDays(today, 1)
  const sendLetterUseCase = new SendLetterUseCase()

  const [form, setForm] = useState<LetterDTO>(LetterDTO.get())
  const [canSubmit, setCanSubmit] = useState<boolean>(true)
  const [messageSent, setMessageSent] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const clearErrorMessage = () => {
    setErrorMessage("")
  }

  const validateForm = () => {

    clearErrorMessage()

    if(!LetterValidator.isMessageValid(form.message))
      return setErrorMessage("Por favor, insira uma mensagem")

    if(!LetterValidator.isEmailValid(form.email)) 
      return setErrorMessage("Por favor, verifique o e-mail")

    if(!LetterValidator.isDateValid(form.date))
      return setErrorMessage("Por favor, verifique a data de entrega")

    if(LetterValidator.dateIsPast(form.date))
      return setErrorMessage("Por favor, insira uma data no futuro")

    return handleFormSubmit()

  }

  const handleFormSubmit = async () => {
    
    const dataToSend = { ...form } as unknown as SendLetterUseCaseInput
    clearErrorMessage()
    setCanSubmit(false)

    sendLetterUseCase.run({
      ...dataToSend,
      id: letterId
    }).then(() => {
      setMessageSent(true)
    }).catch(() => {
      setErrorMessage("Erro ao enviar sua carta para o futuro")
      setCanSubmit(true)
    })
    
  }

  useEffect(() => {
    clearErrorMessage()
  }, [form])

  return (
  <>
    <Head>
      <title>{Settings.APP_NAME}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#2D9CCE" />
      <meta property="og:title" content="Máquina do Tempo - Envie mensagens para o futuro"/>
      <meta property="og:site_name" content="Máquina do Tempo"/>
      <meta property="og:url" content="https://www.maquinadotempo.digital"/>
      <meta property="og:description" content="Esta máquina do tempo "/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="https://www.maquinadotempo.digital/og.jpeg"/>
    </Head>

    <div className={styles.container}>
      <h1 className={styles.title}>{Settings.APP_NAME}</h1>
      <div className={styles.main}>
        {!messageSent ?
        <>
          <div className={styles.description}>Escreva uma carta abaixo, iremos enviá-la para o futuro</div>
          <div className={styles.quillContainer}>
            <QuillNoSSRWrapper value={form.message} onChange={(value: any) => setForm({ ...form, message: value || "" })} className={styles.textbox} placeholder={'Querido eu do futuro,'} />
          </div>
          <div className={styles.fields}>
        
            <TextField fullWidth value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required label="E-mail do destinatário" variant="outlined" />
        
            <LocalizationProvider locale={brLocale} dateAdapter={DateFnsUtils}>
              <DatePicker
                minDate={minDate}
                label="Data de entrega"
                value={form.date}
                onChange={(newValue) => { setForm({ ...form, date: newValue }) }}
                renderInput={(params) => {
                  return <TextField {...params as TextFieldProps} required className={styles.datePicker} fullWidth variant="outlined" />}
                }
              />
            </LocalizationProvider>
          </div>
          { errorMessage.length > 0 && <div className={styles.errorMessage}>{errorMessage}</div> }
          <SendButton disabled={!canSubmit} onClick={e => validateForm()} variant="contained" size="large"><b>ENVIAR</b></SendButton>
        </>
        :
          <SuccessPanel/>
        }
      </div>
      <div className={styles.footerText}>Enviar cartas para o futuro consome muita energia! Ajude o projeto a se manter vivo!</div>
      <div className={styles.footerText}>PIX {'=>'} <a href="mailto:mdbf42@gmail.com">mdbf42@gmail.com</a> </div>
      <div className={styles.footerText}>Copyright &copy; {today.getFullYear()} <a style={{ textDecoration: "underline"}} href="https://www.linkedin.com/in/barros42/">Barros</a>. Todos os direitos reservados </div>
    </div>
  </>
  )
}

export default Home
