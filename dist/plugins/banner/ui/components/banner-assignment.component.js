"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerAssignmentComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const core_2 = require("@vendure/admin-ui/core");
const apollo_angular_1 = require("apollo-angular");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
let BannerAssignmentComponent = class BannerAssignmentComponent {
    constructor(fb, apollo) {
        this.fb = fb;
        this.apollo = apollo;
        this.channels = [];
        this.assets = [];
        this.message = null;
        this.messageType = null;
        this.bannerForm = this.fb.group({
            channelId: [''],
            enabled: [true],
            assetIds: [[]], // Array of asset IDs
        });
    }
    ngOnInit() {
        this.fetchChannels();
        this.fetchAssets();
    }
    fetchChannels() {
        const GET_CHANNELS = (0, graphql_tag_1.default) `
      query GetChannels {
        channels {
          items {
            id
            code
          }
        }
      }
    `;
        this.apollo.watchQuery({ query: GET_CHANNELS })
            .valueChanges.subscribe(result => {
            this.channels = result.data.channels.items;
        });
    }
    fetchAssets() {
        const GET_ASSETS = (0, graphql_tag_1.default) `
      query GetAssets {
        assets {
          items {
            id
            name
          }
        }
      }
    `;
        this.apollo.watchQuery({ query: GET_ASSETS })
            .valueChanges.subscribe(result => {
            this.assets = result.data.assets.items;
        });
    }
    onSubmit() {
        const { channelId, enabled, assetIds } = this.bannerForm.value;
        const CREATE_BANNER = (0, graphql_tag_1.default) `
      mutation CreateBanner($channelId: ID!, $enabled: Boolean, $assetIds: [ID!]!) {
        createBanner(input: { channelId: $channelId, enabled: $enabled, assetIds: $assetIds }) {
          id
        }
      }
    `;
        this.apollo.mutate({
            mutation: CREATE_BANNER,
            variables: {
                channelId,
                enabled,
                assetIds,
            },
        }).subscribe(response => {
            this.showMessage('Banner has been successfully created.', 'success');
        }, error => {
            this.showMessage('Failed to create banner. Please try again.', 'error');
            console.error('Error creating banner:', error);
        });
    }
    showMessage(message, type) {
        this.message = message;
        this.messageType = type;
        setTimeout(() => {
            this.message = null;
            this.messageType = null;
        }, 5000); // Hide after 5 seconds
    }
};
exports.BannerAssignmentComponent = BannerAssignmentComponent;
exports.BannerAssignmentComponent = BannerAssignmentComponent = __decorate([
    (0, core_1.Component)({
        selector: 'vdr-banner-assignment',
        template: `
    <vdr-page-block>
      <p style=" margin-bottom: 1rem;">
        Check twice that the <b>Entered Banner Details</b> and <b>Selected Channel</b> are correct.
      </p>
    
      <div *ngIf="message" [ngClass]="{'success': messageType === 'success', 'error': messageType === 'error'}" class="notification">
        {{ message }}
      </div>

      <form [formGroup]="bannerForm" (ngSubmit)="onSubmit()"
        style="grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 600px; margin: 2rem auto; padding: 2rem; border: 1px solid #ddd; border-radius: 8px; background-color: #dcdcdc;">

        <div style="display: flex; justify-content: space-evenly; gap: 1rem;">
          <div style="flex-grow: 1; min-width: 200px;">
            <label for="channelId" style="display: block; color: black; font-weight: bold; margin-bottom: 0.5rem;">Channel:</label>
            <select id="channelId" formControlName="channelId" required
                    style="width: 100%; padding: 0.5rem; border: 1px solid #5A67D8; border-radius: 4px;">
              <option value="" disabled selected>Select the Channel</option>
              <option *ngFor="let channel of channels" [value]="channel.id">{{ channel.code }}</option>
            </select>
          </div>

          <div style="flex-grow: 1; min-width: 200px;">
            <label for="enabled" style="display: block; color: black; font-weight: bold; margin-bottom: 0.5rem;">Enabled:</label>
            <input type="checkbox" id="enabled" formControlName="enabled" />
          </div>
        </div>

        <div>
          <label for="assetIds" style="display: block; color: black; font-weight: bold; margin-bottom: 0.5rem;">Assets:</label>
          <select id="assetIds" formControlName="assetIds" multiple required
                  style="width: 100%; padding: 0.5rem; border: 1px solid #5A67D8; border-radius: 4px;">
            <option *ngFor="let asset of assets" [value]="asset.id">{{ asset.name }}</option>
          </select>
        </div>

        <div style="grid-column: span 2; text-align: center; margin-top: 1rem;">
          <button type="submit" style="background-color: #5A67D8; color: white; padding: 0.75rem 2rem; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: bold; transition: background-color 0.3s;">
            Submit
          </button>
        </div>
      </form>
    </vdr-page-block>
  `,
        styles: [`
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      z-index: 1000;
      transition: opacity 0.5s ease-in-out;
    }
    .success {
      background-color: #4CAF50;
    }
    .error {
      background-color: #f44336;
    }
  `],
        standalone: true,
        imports: [core_2.SharedModule],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        apollo_angular_1.Apollo])
], BannerAssignmentComponent);
