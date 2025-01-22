"use strict";(self.webpackChunkvendure_admin=self.webpackChunkvendure_admin||[]).push([[362],{9362:(_,f,o)=>{o.r(f),o.d(f,{default:()=>A});var c=o(1644),g=o(6944),i=o(1121),p=o(6884),e=o(5703),b=o(1614);function h(l,t){1&l&&(e.j41(0,"div",7)(1,"p"),e.EFF(2,"No banners available. Create one to get started!"),e.k0s()())}function C(l,t){if(1&l&&e.nrm(0,"img",16),2&l){const n=e.XpG().$implicit;e.Y8G("src",n.assets[0].source,e.B4B)}}function v(l,t){if(1&l){const n=e.RV6();e.j41(0,"div",8)(1,"div",9),e.DNE(2,C,1,1,"img",10),e.k0s(),e.j41(3,"div",11)(4,"div",12)(5,"button",13),e.bIt("click",function(){e.eBV(n);const s=e.sdS(10),r=e.XpG();return e.Njj(r.triggerFileInput(s))}),e.EFF(6,"Update Image"),e.k0s(),e.j41(7,"button",14),e.bIt("click",function(){const s=e.eBV(n).$implicit,r=e.XpG();return e.Njj(r.deleteBanner(s.id))}),e.EFF(8,"Delete"),e.k0s()()(),e.j41(9,"input",15,0),e.bIt("change",function(s){const r=e.eBV(n).$implicit,d=e.XpG();return e.Njj(d.onUpdateAsset(s,r.id))}),e.k0s()()}if(2&l){const n=t.$implicit;e.R7$(2),e.Y8G("ngIf",n.assets.length>0)}}const m=i.Ay`
  query GetBanners {
    customBanners {
      items {
        id
        assets {
          id
          source
        }
        channels {
          id
        }
      }
    }
  }
`;class u{constructor(t,n,a){this.apollo=t,this.dataService=n,this.cdRef=a,this.banners=[],this.selectedAssetId=null,this.currentChannelId=null}ngOnInit(){this.fetchActiveChannel()}fetchActiveChannel(){this.dataService.query(i.Ay`
          query GetActiveChannel {
            activeChannel {
              id
            }
          }
        `).single$.subscribe({next:t=>{this.currentChannelId=t.activeChannel.id,console.log("Active Channel ID:",this.currentChannelId),this.fetchBanners()},error:t=>console.error("Failed to fetch active channel",t)})}fetchBanners(){if(!this.currentChannelId)return;const t=i.Ay`
  query GetBanners {
    customBanners {
      items {
        id
        assets {
          id
          source
        }
        channels {
          id
        }
      }
    }
  }
`;this.apollo.watchQuery({query:t,fetchPolicy:"network-only"}).valueChanges.subscribe({next:n=>{console.log("Fetched Banners:",n.data.customBanners.items),this.banners=n.data.customBanners.items.filter(a=>a.channels.some(s=>s.id===this.currentChannelId)),this.cdRef.detectChanges(),console.log("Filtered Banners:",this.banners)},error:n=>console.error("Failed to fetch banners",n)})}onAssetSelected(t){const n=t.target.files[0];if(!n)return;const a=i.Ay`
      mutation CreateAsset($input: [CreateAssetInput!]!) {
        createAssets(input: $input) {
          ... on Asset {
            id
            source
          }
          ... on MimeTypeError {
            message
            fileName
          }
        }
      }
    `;this.apollo.mutate({mutation:a,variables:{input:[{file:n}]},context:{useMultipart:!0}}).subscribe({next:s=>{if(console.log("Upload Response:",s),s.data&&s.data.createAssets){const r=s.data.createAssets.find(d=>d.id);r?.id&&(this.selectedAssetId=r.id,console.log("Selected Asset ID:",this.selectedAssetId))}},error:s=>console.error("Asset upload failed",s)})}onSubmit(){this.selectedAssetId&&(this.createBanner(this.selectedAssetId),this.selectedAssetId=null)}createBanner(t){if(!this.currentChannelId)return;const n=i.Ay`
      mutation CreateCustomBanner($input: CreateCustomBannerInput!) {
        createCustomBanner(input: $input) { id assets { source } }
      }
    `;this.apollo.mutate({mutation:n,variables:{input:{assetIds:[t]}},refetchQueries:[{query:m}]}).subscribe({next:()=>{console.log("Banner created successfully")},error:a=>console.error("Create banner failed",a)})}triggerFileInput(t){t.click()}onUpdateAsset(t,n){const a=t.target.files[0];if(!a)return;const s=i.Ay`
      mutation CreateAsset($input: [CreateAssetInput!]!) {
        createAssets(input: $input) {
          ... on Asset {
            id
            source
          }
          ... on MimeTypeError {
            message
            fileName
          }
        }
      }
    `;this.apollo.mutate({mutation:s,variables:{input:[{file:a}]},context:{useMultipart:!0}}).subscribe({next:r=>{if(console.log("Upload Response:",r),r.data&&r.data.createAssets){const d=r.data.createAssets.find(B=>B.id);d?.id&&this.updateBanner(n,d.id)}},error:r=>console.error("Asset upload failed",r)})}updateBanner(t,n){const a=i.Ay`
      mutation UpdateCustomBanner($input: UpdateCustomBannerInput!) {
        updateCustomBanner(input: $input) {
          id
          assets { source }
        }
      }
    `;this.apollo.mutate({mutation:a,variables:{input:{id:t,assetIds:[n]}}}).subscribe({next:()=>{console.log("Banner updated successfully"),this.fetchBanners(),this.cdRef.detectChanges()},error:s=>console.error("Update banner failed",s)})}deleteBanner(t){const n=i.Ay`
      mutation DeleteCustomBanner($id: ID!) {
        deleteCustomBanner(id: $id) { result }
      }
    `;this.apollo.mutate({mutation:n,variables:{id:t},refetchQueries:[{query:m}]}).subscribe({next:()=>{this.fetchBanners(),console.log("Banner deleted successfully")},error:a=>console.error("Delete banner failed",a)})}static{this.\u0275fac=function(n){return new(n||u)(e.rXU(b.Ic),e.rXU(c.uSP),e.rXU(e.gRc))}}static{this.\u0275cmp=e.VBU({type:u,selectors:[["banner-management"]],standalone:!0,features:[e.aNF],decls:10,vars:3,consts:[["fileInput",""],[1,"upload-section"],["type","file","accept","image/*",3,"change"],["vdr-button","","type","submit","color","primary",1,"custom-upload-btn",3,"click","disabled"],[1,"banner-grid"],["class","empty-state",4,"ngIf"],["class","banner-card",4,"ngFor","ngForOf"],[1,"empty-state"],[1,"banner-card"],[1,"banner-image"],["class","image",3,"src",4,"ngIf"],[1,"banner-info"],[1,"banner-actions"],[1,"action-btn","update-btn",3,"click"],[1,"action-btn","delete-btn",3,"click"],["type","file","accept","image/*",2,"display","none",3,"change"],[1,"image",3,"src"]],template:function(n,a){1&n&&(e.j41(0,"vdr-page-block")(1,"vdr-card")(2,"div",1)(3,"vdr-form-field")(4,"input",2),e.bIt("change",function(r){return a.onAssetSelected(r)}),e.k0s()(),e.j41(5,"button",3),e.bIt("click",function(){return a.onSubmit()}),e.EFF(6," Upload Banner\n"),e.k0s()()(),e.j41(7,"div",4),e.DNE(8,h,3,0,"div",5)(9,v,11,1,"div",6),e.k0s()()),2&n&&(e.R7$(5),e.Y8G("disabled",!a.selectedAssetId),e.R7$(3),e.Y8G("ngIf",0===a.banners.length),e.R7$(),e.Y8G("ngForOf",a.banners))},dependencies:[c.GgS,p.Sq,p.bT,c.KSf,c.Vr5,c.eH4,c.iby,p.MD,g.X1],styles:[".upload-section[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:12px;padding:16px}.custom-upload-btn[_ngcontent-%COMP%]{padding:12px 24px;background:linear-gradient(45deg,#4caf50,#45a049);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer;transition:background .3s,transform .3s;text-transform:uppercase}.custom-upload-btn[_ngcontent-%COMP%]:hover{background:linear-gradient(45deg,#45a049,#4caf50);transform:scale(1.05)}.custom-upload-btn[disabled][_ngcontent-%COMP%]{background:#d3d3d3;cursor:not-allowed}.banner-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;padding:16px}.banner-card[_ngcontent-%COMP%]{background-color:#fff;border-radius:8px;box-shadow:0 4px 12px #0000001a;overflow:hidden;text-align:center;transition:transform .3s ease-in-out;padding:16px}.banner-card[_ngcontent-%COMP%]:hover{transform:translateY(-8px)}.banner-image[_ngcontent-%COMP%]{width:100%;height:200px;display:flex;justify-content:center;align-items:center;background-color:#f4f4f4;border-radius:6px;overflow:hidden}.banner-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto;object-fit:cover}.banner-info[_ngcontent-%COMP%]{margin-top:12px}.banner-actions[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:8px}.action-btn[_ngcontent-%COMP%]{padding:8px 12px;border:none;border-radius:6px;cursor:pointer;transition:.3s}.update-btn[_ngcontent-%COMP%]{background-color:#007bff;color:#fff}.update-btn[_ngcontent-%COMP%]:hover{background-color:#0056b3}.delete-btn[_ngcontent-%COMP%]{background-color:#ff4d4d;color:#fff}.delete-btn[_ngcontent-%COMP%]:hover{background-color:#c00}.empty-state[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:20px;border-radius:8px}\n\n/*# sourceMappingURL=banner.component.ts-angular-inline--3.css.map*/"]})}}const A=[(0,c.hUq)({component:u,path:"",title:"Banner Management",breadcrumb:"Banners"})]}}]);
//# sourceMappingURL=362.c9371c09fe4689a9.js.map