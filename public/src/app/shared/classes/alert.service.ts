import swal from 'sweetalert'

export interface AlertInstance {
  then():void
}

export class AlertService {
  static swal(title?: string, text?: string, icon?: string, buttons?:any, danderMode?:boolean, then?: (des:boolean) => void):AlertInstance {
    return swal({
      title: title,
      text: text,
      icon: icon,
      buttons: buttons,
      dangerMode: danderMode,
    }).then(then)
  }
}
