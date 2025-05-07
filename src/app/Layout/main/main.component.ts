import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';


import {
  homeOutline,
  searchOutline,
  notificationsOutline,
  settingsOutline, playCircle, radio, library,
  search, arrowBack,
  logoWechat,
  home,
  settings
} from 'ionicons/icons';

import { addIcons } from 'ionicons';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from "../../Core/loading/loading.component";
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';
import { IonSplitPane, IonHeader, IonToolbar, IonMenuButton, IonButtons, IonTitle, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/angular/standalone";
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/Core/Services/auth.service';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, IonMenuButton, IonRouterOutlet, IonTitle, IonButtons, IonToolbar, IonHeader, IonSplitPane, FormsModule,
    MenuComponent, TranslateModule, LoadingComponent]
})
export class MainComponent implements OnInit, OnDestroy {
  selectedLanguage = 'sv';
  pageTitle: string = '';
  isLoading = false;
  darkMode = false;
  private langChangeSub!: Subscription;
  constructor(
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public titleService: Title,
    private platform: Platform, private location: Location,
    private menuCtrl: MenuController,
    public authService: AuthService
  ) {

    this.initializeApp();


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
          this.translate.get(title).subscribe((translatedTitle: string) => {
            this.pageTitle = translatedTitle;
            this.titleService.setTitle(translatedTitle);
          });
        }
      });

    addIcons({ logoWechat, arrowBack, home, search, settings, playCircle, radio, library });
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

  ngOnInit() {
    this.menuCtrl.enable(true, 'main-menu');
    setTimeout(() => {
      this.menuCtrl.open('main-menu');
    }, 1500);
    this.initializeDarkTheme();
  }

  async initializeDarkTheme() {
    try {
      const prefersDark = localStorage.getItem('darkMode');

      if (prefersDark === 'true') {
        this.darkMode = true;
        document.body.classList.add('dark');
      } else if (prefersDark === null) {
        const prefersDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkMedia.matches) {
          this.darkMode = true;
          document.body.classList.add('dark');
        }
      }
    } catch (error) {
      console.error("Error initializing dark theme:", error);
    } finally {
      this.cdr.detectChanges(); // Force change detection after localStorage access
    }
  }



  private updatePageTitle() {
    let child = this.activatedRoute.firstChild;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data && child.snapshot.data['title']) {
        this.translate.get(child.snapshot.data['title']).subscribe((translatedTitle: string) => {
          this.pageTitle = translatedTitle;
          this.titleService.setTitle(translatedTitle);
        });
        return;
      } else {
        return;
      }
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      App.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) {
          this.location.back(); // صفحه به عقب برمی‌گردد
        } else {
          App.exitApp(); // خروج از برنامه اگر دیگه صفحه‌ای برای برگشت نباشه
        }
      });
    });
  }


  homePage() {
    this.router.navigateByUrl('/home');
  }
  chat() {
    this.router.navigateByUrl('/chat');

  }
  specialists() {
    this.router.navigateByUrl('/specialists');
  }
  goSettingPage() {
    this.router.navigateByUrl('/settings');
  }


  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe(); // جلوگیری از Memory Leak
    }
  }
}

