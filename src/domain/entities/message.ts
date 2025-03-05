export class Message {
    constructor(
        public readonly phone_number: string,
        public readonly content: string,
        public readonly company_id: string,
        public readonly campaign_id: string,
        public readonly timestamp: Date
        
    ) {}
}