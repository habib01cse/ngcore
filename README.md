# Pridebookpro

ERP Application Front-End by Pridesys IT Ltd &copy;.

## Serve locally

```bash
npm start
```

## Production Build

```bash
npm run build-prod
```

## To be changed in production

- ./angular.json
  - buildOptimizer: false -> true
  - sourceMap: false -> true

## CI/CD Maintanance

### Possible issues

- timeout failure or the job got stuck
    - "There has been a timeout failure or the job got stuck. Check your timeout limits or try again"

- runner system faliure
    - "There has been a runner system failure, please try again"
    - "ERROR: Job failed (system failure): Error response from daemon: Get https://registry-1.docker.io/v2/: dial tcp: lookup registry-1.docker.io on 127.0.1.1:53: server misbehaving (executor_docker.go:175:6s)"


### Possible solutions

> check if the runners are working alright
```bash
sudo gitlab-runner status
sudo gitlab-runner verify
```

> restart the runner service

```bash
sudo gitlab-runner restart

# or

sudo gitlab-runner stop
sudo gitlab-runner start
```

### Further Troubleshooting

If the provided solution suggestions don't work, look up the particular errors/logs on Google/StackOverflow.

Study the documentation for: 

- [CI/CD Config](https://docs.gitlab.com/ee/ci/)
- [Runner Config](https://docs.gitlab.com/runner/)
- [Yaml Config](https://docs.gitlab.com/ee/ci/yaml/)

## How to use Dynamic Modal Library

### Installation
```bash
npm install dynamicModal
```

*AppModule:*

```
import { DynamicModalModule, DynamicModalService } from 'dynamicModal';
import { modalLazyModules } from './app.config.lazy.module';
@NgModule({
    ...
    imports: [ ..., DynamicModalModule.forRoot(modalLazyModules) ],
    providers: [ ..., DynamicModalService ],
})

```
### General use-case

*Step-1:* Make sure you declare the module in App routing
```
const routes: Routes = [
    ...,
    { path: 'common-list', loadChildren: "src/app/shared/modules/modals/common-list/common-list.module" }
]
```
*Step-2:* Make sure you declare the module in App routing
    - Declare & add the components to EntryComponents
    - Add components with a name to static components
```
    export class CommonListModule {
        static components = { list: CommonListComponent };
    }
```
*Step-3:* DI of DynamicModalService & CALL
```
constructor(
    ...
    , public modalService: DynamicModalService
)
```
```
this.modalService.openDialog(MODULE_NAME:string, COMPONENT_KEY:string, {title:string, data?: any, settings?:{
    modalClass?: string; ['sm', 'md', 'lg']
    overlayClass?: string;
    overlayAnimationTriggerClass?: string;
    modalAnimationTriggerClass?: string;
    contentClass?: string;
    headerClass?: string;
    headerTitleClass?: string;
    closeButtonClass?: string;
    closeButtonTitle?: string;
    bodyClass?: string;
    footerClass?: string;
    alertClass?: string;
    alertDuration?: number;
    buttonClass?: string;
    notifyWithAlert?: boolean;
} })
```
```
    this.modalService.openDialog('CommonListModule', 'list', {title:"Default Title", data: {}, settings:{} }).then((modal:any)=> {
        modal.closed = ()=> {
        };
        modal.success = (data)=> {
          console.log(data);
        };
    });
```

### Ag-Grid validation

See `HR_1076` `&` `HR_1009`
