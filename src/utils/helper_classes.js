import {v4 as uuidv4} from 'uuid';

export class DomainCartItem {
    constructor(
        name,
        price,
        billing_cycle = "annually",
        id = uuidv4(),
        active = true,
        created_at = new Date(),
        renewal_date = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = "Domain registration";
        this.active = active;
        this.billing_cycle = billing_cycle;
        this.created_at = created_at;
        this.renewal_date = renewal_date;
    }
}

// hosting-cart-item.js
export class HostingCartItem {
    constructor(name, type, price, domain, billing_cycle, id = null, active = true, description = "Hosting", created_at = new Date(), activated_at = new Date(), renewal_date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.description = description;
        this.active = active;
        this.domain = domain;
        this.billing_cycle = billing_cycle;
        this.created_at = created_at;
        this.activated_at = activated_at;
        this.renewal_date = renewal_date;
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