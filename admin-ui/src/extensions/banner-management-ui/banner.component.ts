import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@vendure/admin-ui/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'banner-management',
  template: `
    <vdr-page-block>
      <h2>Manage Banners</h2>

      <!-- Form to Upload Banner Image -->
      <form [formGroup]="bannerForm" (ngSubmit)="onSubmit()">
        <input type="file" (change)="onAssetSelected($event)" accept="image/*" />
        <button type="submit" [disabled]="!selectedAssetId">Create Banner</button>
      </form>

      <!-- Display Banners in Grid -->
      <div class="grid-container">
        <div *ngFor="let banner of banners" class="grid-item">
          <div class="image-wrapper">
            <img *ngIf="banner.assets.length > 0" [src]="banner.assets[0].source" class="banner-image" />
          </div>
          
          <!-- Hidden file input for updating image -->
          <input type="file" #fileInput (change)="onUpdateAsset($event, banner.id)" accept="image/*" style="display: none;" />
          
          <!-- Update and Delete Buttons -->
          <div class="button-container">
            <button class="update-btn" (click)="triggerFileInput(fileInput)">Update Image</button>
            <button class="delete-btn" (click)="deleteBanner(banner.id)">Delete</button>
          </div>
        </div>
      </div>
    </vdr-page-block>
  `,
  styles: [`
    .grid-container {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
      padding: 20px;
    }

    .grid-item {
      width: 250px;
      background: transparent;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 6px;
      text-align: center;
      transition: transform 0.3s ease-in-out;
    }

    .grid-item:hover {
      transform: translateY(-5px);
    }

    .image-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border-radius: 8px;
      overflow: hidden;
    }

    .banner-image {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .button-container {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .update-btn, .delete-btn {
      padding: 8px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.3s;
    }

    .update-btn {
      background: #007bff;
      color: white;
    }

    .update-btn:hover {
      background: #0056b3;
    }

    .delete-btn {
      background: #ff4d4d;
      color: white;
    }

    .delete-btn:hover {
      background: #cc0000;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .grid-container {
        justify-content: center;
      }
      
      .grid-item {
        width: 90%;
      }
    }
  `],
  standalone: true,
  imports: [SharedModule, CommonModule, ReactiveFormsModule],
})
export class BannerComponent implements OnInit {
  banners: Array<{ id: string, assets: { source: string }[] }> = [];
  selectedAssetId: string | null = null;
  bannerForm: FormGroup;

  constructor(private apollo: Apollo, private fb: FormBuilder) {
    this.bannerForm = this.fb.group({});
  }

  ngOnInit() {
    this.fetchBanners();
  }

  fetchBanners() {
    const GET_BANNERS = gql`
      query GetBanners {
        customBanners(options: { skip: 0, take: 10 }) {
          items {
            id
            assets {
              id
              source
            }
          }
          totalItems
        }
      }
    `;
    this.apollo.watchQuery<{ customBanners: { items: any[]; totalItems: number } }>({
      query: GET_BANNERS
    })
    .valueChanges.subscribe(result => {
      this.banners = result.data.customBanners.items;
    });
  }

  onAssetSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const UPLOAD_ASSET = gql`
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
    `;

    this.apollo.mutate<{ createAssets: Array<{ id?: string; source?: string; message?: string }> }>({
      mutation: UPLOAD_ASSET,
      variables: { input: [{ file }] },
      context: {
        useMultipart: true,
      },
    }).subscribe({
      next: (response) => {
        const assets = response.data?.createAssets || [];
        const uploadedAsset = assets.find(asset => asset.id);

        if (uploadedAsset?.id) {
          this.selectedAssetId = uploadedAsset.id;
          // Fetch banners after upload
          this.fetchBanners();
        } else {
          console.error("Asset upload failed:", assets);
        }
      },
      error: (err) => console.error("Asset upload failed", err),
    });
  }

  onSubmit() {
    if (!this.selectedAssetId) return;
    this.createBanner(this.selectedAssetId);
    this.selectedAssetId = null;
    this.bannerForm.reset();
  }

  createBanner(assetId: string) {
    const CREATE_BANNER = gql`
      mutation CreateCustomBanner($input: CreateCustomBannerInput!) {
        createCustomBanner(input: $input) { id assets { source } }
      }
    `;

    this.apollo.mutate<{ createCustomBanner: { id: string, assets: { source: string }[] } }>({
      mutation: CREATE_BANNER,
      variables: { input: { assetIds: [assetId] } }
    }).subscribe({
      next: () => {
        // Fetch banners after creating new banner
        this.fetchBanners();
        this.selectedAssetId = null;
        this.bannerForm.reset();
      },
      error: (err) => console.error("Create banner failed", err)
    });
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onUpdateAsset(event: any, bannerId: string) {
    const file = event.target.files[0];
    if (!file) return;
    
    const UPLOAD_ASSET = gql`
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
    `;
    
    this.apollo.mutate<{ createAssets: Array<{ id?: string; source?: string; message?: string }> }>({
      mutation: UPLOAD_ASSET,
      variables: { input: [{ file }] },
      context: {
        useMultipart: true,
      },
    }).subscribe({
      next: (response) => {
        const assets = response.data?.createAssets || [];
        const uploadedAsset = assets.find(asset => asset.id); 

        if (uploadedAsset?.id) {
          this.updateBanner(bannerId, uploadedAsset.id);
        } else {
          console.error("Asset upload failed:", assets);
        }
      },
      error: (err) => console.error("Asset upload failed", err),
    });
  }

  updateBanner(bannerId: string, assetId: string) {
    const UPDATE_BANNER = gql`
      mutation UpdateCustomBanner($input: UpdateCustomBannerInput!) {
        updateCustomBanner(input: $input) { id assets { source } }
      }
    `;

    this.apollo.mutate<{ updateCustomBanner: { id: string, assets: { source: string }[] } }>({
      mutation: UPDATE_BANNER,
      variables: { input: { id: bannerId, assetIds: [assetId] } }
    }).subscribe({
      next: () => {
        // Fetch banners after updating
        this.fetchBanners();
      },
      error: (err) => console.error("Update banner failed", err)
    });
  }

  deleteBanner(bannerId: string) {
    const DELETE_BANNER = gql`
      mutation DeleteCustomBanner($id: ID!) {
        deleteCustomBanner(id: $id) { result }
      }
    `;

    this.apollo.mutate<{ deleteCustomBanner: { result: string } }>({
      mutation: DELETE_BANNER,
      variables: { id: bannerId }
    }).subscribe({
      next: () => {
        // Fetch banners after deletion
        this.fetchBanners();
      },
      error: (err) => console.error("Delete banner failed", err)
    });
  }
}
