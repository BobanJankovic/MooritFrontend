import { Component, LOCALE_ID  } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet-control-geocoder';
import { Mooring, User } from '@app/_models';
import { AccountService, HomeService } from '@app/_services';
import { environment } from '@environments/environment';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({   selector: 'app-root', templateUrl: './home.component.html', styleUrls: ['./home.component.css'], })
export class HomeComponent {
    user: User | null;
    moorings: Mooring[]=[];
    map!: Leaflet.Map;
    markers: Leaflet.Marker[] = [];
    options = {
      layers: [
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }),
      ],
      zoom: 9.4,
      center: { lat: 44.605939610682216, lng: 14.783800149739583 },
    };

    oneDay:number = 86400000;
    startDate:string = this.calculateDate(false,false);
    endDate:string = this.calculateDate(true,false);
    minStartTime:string = this.calculateDate(false,false);
    minEndTime:string = this.calculateDate(false,false);
    isExpires:boolean=true;
    isAvailable:boolean=true;
    isOccupied:boolean=true;


    calculateDate(isEndDate:boolean,isEndDateInPast:boolean){
		const endDate = isEndDateInPast?new Date(this.startDate).getTime():new Date().getTime();
		const date =isEndDate? new Date(endDate + this.oneDay): new Date();
		const isoString = date.toISOString();
		const yearMonthDay = isoString.substring(0, 10);
		const hourMinute = date.toLocaleTimeString("en-GB", {hour12: false, hour: '2-digit', minute: '2-digit'});
		return `${yearMonthDay}T${hourMinute}`;
    }

    setStartDate(){
		const startDate = new Date(this.startDate);
		const endDate = new Date(this.endDate);

		if ((startDate >= endDate) ) {
			this.endDate = this.calculateDate(true,true);
		} 
		this.minEndTime =  this.calculateDate(true,true);
		this.markers.forEach((marker)=>{
			this.map.removeLayer(marker);
		})

		this.markers=[];
		this.homeService.getAllMoorings({startDate:this.startDate,endDate:this.endDate}).subscribe((response)=>{
			this.initMarkers(response);
		});
    }

    setEndDate(){
		this.markers.forEach((marker)=>{
			this.map.removeLayer(marker);
		})

		this.markers=[];
		this.homeService.getAllMoorings({startDate:this.startDate,endDate:this.endDate}).subscribe((response)=>{
			this.initMarkers(response);
		});
    }
      

    public onSetExpires(value:boolean){
        this.isExpires = value;
		this.markers.forEach((marker)=>{
			this.map.removeLayer(marker);
		})

		this.markers=[];
		this.homeService.getAllMoorings({startDate:this.startDate,endDate:this.endDate}).subscribe((response)=>{
			this.initMarkers(response);
		});
    }

    public onSetAvailable(value:boolean){
        this.isAvailable = value;
		this.markers.forEach((marker)=>{
			this.map.removeLayer(marker);
		})

		this.markers=[];
		this.homeService.getAllMoorings({startDate:this.startDate,endDate:this.endDate}).subscribe((response)=>{
			this.initMarkers(response);
		});
    }

    public onSetOccupied(value:boolean){
        this.isOccupied = value;
		this.markers.forEach((marker)=>{
			this.map.removeLayer(marker);
		})

		this.markers=[];
		this.homeService.getAllMoorings({startDate:this.startDate,endDate:this.endDate}).subscribe((response)=>{
			this.initMarkers(response);
		});
    }

    constructor(private accountService: AccountService,private homeService: HomeService) {
        this.user = this.accountService.userValue;
    }

    initMarkers(response:any[]) {
        if(response.length){
			const availableMarkers = response.filter((marker)=>marker.status === 0 && this.isAvailable);
			const expiresMarkers = response.filter((marker)=>marker.status === 1 && this.isExpires);
			const occupiedMarkers = response.filter((marker)=>marker.status === 2 && this.isOccupied);
		
            const initialMarkers =  [...availableMarkers,...expiresMarkers,...occupiedMarkers].map((mooring:any)=>{
                return {
                    mooringId:mooring.id,
                    name: mooring.name,
                    position: { lat: mooring.latitude, lng: mooring.longitude },
                    draggable: false,
                    status:mooring.status,
					price:mooring.price
                }
            })
            for (let index = 0; index < initialMarkers.length; index++) {
                const data = initialMarkers[index];
                const marker = this.generateMarker(data, index);
                const date1 = new Date(this.startDate);
                const date2 = new Date(this.endDate);
                const diffTime = Math.abs(date2.getTime() - date1.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const price = data.price*diffDays;
                const bookingUrl = data.status !==0 ? `${environment.localhost}/mooringDetails/${data.mooringId}` : `${environment.localhost}/bookamoor/?startDate=${this.startDate}&endDate=${this.endDate}&price=${price}&applicationUserModelId=${this.user?.id}&mooringId=${data.mooringId}`; 
                const label = data.status !==0 ? `View Mooring's Bookings` : `Book this mooring, ${data.name}`;
				marker
                  .addTo(this.map)
                 .bindPopup(`<a href=${bookingUrl}>${label}</a>`);
                this.markers.push(marker);
            }
        }
    }
    
	generateColor = (status: number) => {
		if (status == 1) {
			return 'gold';
		} else {
			if (status == 2) {
			return 'red';
			} else {
			return 'green';
			}
		}
	};

	generateMarker(data: any, index: number) {
		console.warn(data);
		const color = this.generateColor(data.status);
		return Leaflet.marker(data.position, {
			icon: new Leaflet.Icon({
			iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
			shadowUrl:
			'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41],
			}),
			draggable: data.draggable,
			title:data.name,
			alt:data.mooringId
		}).on('click', (event) => this.markerClicked(event, index,data));
	}

	onMapReady($event: Leaflet.Map) {
		this.homeService.getAllMoorings({startDate:this.startDate,endDate:this.endDate}).subscribe((response)=>{
			console.warn("sss22",this.moorings)
			this.map = $event;
			this.initMarkers(response);
		});
	}

	mapClicked($event: any) {
		console.log($event.latlng.lat, $event.latlng.lng);
	}

	markerClicked($event: any, index: number,data:any) {
		console.log($event.latlng.lat, $event.latlng.lng);
	}
}






