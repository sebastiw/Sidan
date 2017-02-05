export class Entry {
  constructor(
		public Signature?: string,
		public Message?: string,
		public Time?: string,
		public Date?: Date,
		public Enheter?: number,
		public Status?: number,
		public Likes?: string,
		public Id?: number,
		public Secret?: boolean,
		public PersonalSecret?: boolean
	){}
}
