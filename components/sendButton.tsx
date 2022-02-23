import { Button, styled } from "@material-ui/core";

const SendButton = styled(Button)({
    backgroundColor: '#D85116',
    color: '#FFF',
    width: '90%',
    '&:hover' : {
      backgroundColor: '#d69072'
    }
})

export default SendButton