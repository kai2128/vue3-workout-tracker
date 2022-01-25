export enum MessageType {
    INFO,
    SUCCESS,
    ERROR,
    DEFAULT
}

const message = reactive({
    text: '',
    type: MessageType.INFO as MessageType,
})


export const useFlashMessage = () => {
   return {
       msgStyle: computed(() => {
           switch(message.type){
               case MessageType.INFO:
                   return 'bg-blue-50 text-blue-700 rounded'
               case MessageType.SUCCESS:
                   return 'bg-green-50 text-green-700 rounded'
               case MessageType.ERROR:
                   return 'bg-red-50 text-red-800 rounded'
               case MessageType.DEFAULT:
                   return ''
           }
       }),
       flashMessage: computed(
               () => message.text
       ),
       setMsg(text: string, type: MessageType = MessageType.INFO){
         message.text = text
         message.type = type
         setTimeout(() => {
            message.text = ''
        }, 5000)
       }
   }
}