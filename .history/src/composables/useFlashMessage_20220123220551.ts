enum MessageType {
    INFO,
    SUCCESS,
    ERROR,
    DEFAULT
}

const elem = ref<HTMLElement | null>(null);

const message = reactive({
    text: '',
    type: MessageType.DEFAULT as MessageType,
})

let timeout = 5000;

export const useFlashMessage = () => {
   return {
       setTimeout(newTimeout: number) {timeout = newTimeout},
       bindElem(el: HTMLElement){
           elem.value = el;
       },
       msgStyle: computed(() => {
           switch(message.type){
               case MessageType.INFO:
                   return 'py-2 px-4 text-lg bg-blue-50 text-blue-700 rounded'
               case MessageType.SUCCESS:
                   return 'py-2 px-4 text-lg bg-green-50 text-green-700 rounded'
               case MessageType.ERROR:
                   return 'py-2 px-4 text-lg bg-rose-50 text-red-700 rounded'
               case MessageType.DEFAULT:
                   return ''
           }
       }),
       flashMessage: computed(
               () => message.text
       ),
       setMsg(text: string, type: MessageType = MessageType.DEFAULT){
         message.text = text
         message.type = type
       }
   }
}