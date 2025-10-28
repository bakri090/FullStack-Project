import { Component } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private _userData:UserDataService){
  }
  userName:string= '';
  responsiveOptions: any[] | undefined;

  ngOnInit(){
      this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ]
    this.getName();
  }
getName() {
  this.userName=String(localStorage.getItem('userName'));
}

  apartments = [
    {
      title: 'شقة راقية في الرياض',
      location: 'حي النخيل',
      price: 3500,
      // image: 'assets/images/apt1.jpg',
    },
    {
      title: 'شقة مفروشة بالكامل',
      location: 'جدة - حي النسيم',
      price: 2800,
      // image: 'assets/images/apt2.jpg',
    },
    {
      title: 'شقة عائلية فسيحة',
      location: 'الدمام - حي الفيصلية',
      price: 3200,
      // image: 'assets/images/apt3.jpg',
    },
  ];

  offers = [
    {
      title: 'خصم 20% على الإيجار الشهري',
      description: 'لفترة محدودة على الشقق الفاخرة بالرياض.',
      image: 'assets/images/offer1.jpg',
    },
    {
      title: 'عرض الصيف',
      description: 'أحصل على شهر مجاني عند توقيع عقد سنوي.',
      image: 'assets/images/offer2.jpg',
    },
    {
      title: 'تخفيضات نهاية الموسم',
      description: 'أسعار مميزة للشقق المفروشة.',
      image: 'assets/images/offer3.jpg',
    },
  ];

  services = [
    {
      title: 'بحث سريع',
      icon: 'pi pi-search',
      description: 'ابحث عن شقتك بسهولة في ثوانٍ.',
    },
    {
      title: 'دعم فني 24/7',
      icon: 'pi pi-headset',
      description: 'نحن هنا لمساعدتك في أي وقت.',
    },
    {
      title: 'تأجير سهل وآمن',
      icon: 'pi pi-home',
      description: 'إجراءات تأجير بسيطة وسريعة.',
    },
  ];

}
