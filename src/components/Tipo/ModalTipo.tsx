import React from "react"
import { FormattedMessage, useIntl } from "react-intl"
import {useTipoCRUD,TipoInfo} from '../../hooks/api'
import {Modal} from 'reactstrap'
import { registerModal, useModal } from '@gluedigital/modal'
interface ModalTipoProps {
data?: TipoInfo
}

const ModalTipo =({data}:ModalTipoProps)=>{
    const modal= useModal();
    const intl= useIntl()
    console.log(data?.id)


return(
<Modal>

</Modal>
)
}
export default ModalTipo;