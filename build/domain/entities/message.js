export class Message {
    phone_number;
    content;
    company_id;
    campaign_id;
    timestamp;
    constructor(phone_number, content, company_id, campaign_id, timestamp) {
        this.phone_number = phone_number;
        this.content = content;
        this.company_id = company_id;
        this.campaign_id = campaign_id;
        this.timestamp = timestamp;
    }
}
