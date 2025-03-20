import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonSplitPane, IonRouterOutlet, IonTabs, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MenuComponent } from '../menu/menu.component';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonLabel, IonHeader, IonButtons, IonMenuButton, IonBackButton, IonButton, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import {
  homeOutline,
  searchOutline,
  notificationsOutline,
  settingsOutline, playCircle, radio, library,
  search, arrowBack
} from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from "../../Core/loading/loading.component";
@Component({
  selector: 'app-main-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonTabs, IonSplitPane, IonTabs, IonButtons, IonSelect, IonSelectOption, FormsModule, IonButton, IonMenuButton, IonTitle,
    IonRouterOutlet,
    MenuComponent, IonLabel,
    IonTabBar, IonTabButton, IonIcon, IonToolbar, IonHeader, TranslateModule, LoadingComponent]
})
export class MainComponent implements OnInit, OnDestroy {
  selectedLanguage = 'sv';
  pageTitle: string = '';
  isLoading = false;
  private langChangeSub!: Subscription; // متغیری برای ذخیره Subscription

  constructor(
    private translate: TranslateService,
    private navController: NavController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public titleService: Title
  ) {
    // دریافت عنوان صفحه و ترجمه آن هنگام بارگذاری
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.translate.get(title).subscribe(translatedTitle => {
            this.pageTitle = translatedTitle;
            this.titleService.setTitle(translatedTitle);
          });
        }
      });

    addIcons({ arrowBack, homeOutline, searchOutline, notificationsOutline, settingsOutline, playCircle, radio, library, search });
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
      this.translate.use(this.selectedLanguage);
    } else {
      this.translate.setDefaultLang(this.selectedLanguage);
      this.translate.use(this.selectedLanguage);
    }

    // گوش دادن به تغییرات زبان
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.updatePageTitle();
    });
  }

  changeLanguage(event: any) {
    const lang = event.detail.value;
    this.isLoading = true;
    setTimeout(() => { this.isLoading = false; }, 1000);
    this.translate.use(lang);
    this.selectedLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
    console.log('Language changed to:', lang);
  }

  private updatePageTitle() {
    let child = this.activatedRoute.firstChild;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data && child.snapshot.data['title']) {
        this.translate.get(child.snapshot.data['title']).subscribe(translatedTitle => {
          this.pageTitle = translatedTitle;
          this.titleService.setTitle(translatedTitle);
        });
        return;
      } else {
        return;
      }
    }
  }

  goBack() {
    this.navController.back();
  }
  homePage() {
    this.router.navigateByUrl('/home');
  }
  goSettingPage() {
    this.router.navigateByUrl('/settings');
  }
  ngOnInit() { }

  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe(); // جلوگیری از Memory Leak
    }
  }
}

