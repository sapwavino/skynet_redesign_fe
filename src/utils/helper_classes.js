import {v4 as uuidv4} from 'uuid';
import store from "@/store/index.js";

export class DomainCartItem {
    constructor(
        name,
        price
    ) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.order_type = "domain";
        this.description = "Domain registration for " + name;
        this.active = true;
        this.billing_cycle = "annually";
        this.created_at = new Date();
        this.renewal_date = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());
    }
}

export class HostingCartItem {
    constructor(
        panel,
        quantity = 1,
        duration,
        domain,
        plan
    ) {
        this.type = 'hosting'
        this.panel = panel;
        this.quantity = quantity;
        this.domain = domain;
        this.duration = duration;
        this.plan = plan;
        this.description = this.panel + ' hosting';
        this.product = this.getProduct()
    }

    getProduct() {
        return store.getters["products/getHostingProducts"].find((one) => {
            return one.slug === this.panel + '-' + this.plan
        })
    }
}


// cloud-cart-item.js
export class CloudCartItem {
    constructor(
        name,
        service_type,
        os,
        os_version,
        access_modes,
        price,
        billing_cycle
    ) {

        if (!name) {
            throw new Error("Your cloud server name is required.");
        }

        this.id = uuidv4();
        this.name = name;
        this.order_type = "cloud";
        this.service_type = service_type;
        this.os = os;
        this.os_version = os_version;
        this.price = price;
        this.access_modes = access_modes;
        this.description = `${service_type} ${os} ${os_version} VPS`;
        this.active = true;
        this.billing_cycle = billing_cycle || "monthly";
        this.created_at = new Date();
        this.activated_at = new Date();
        this.renewal_date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    }
}