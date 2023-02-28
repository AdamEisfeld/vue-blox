import type { ComponentPublicInstance } from 'vue'

export class BloxContext {

	component: ComponentPublicInstance<any>
	view: any = undefined
	props: Record<string, any> = {}
	slots: Record<string, BloxContext[]> = {}

	setProp({ propName, value }: { propName: string, value: any }) {
		if (value !== undefined) {
			this.props[propName] = value
		} else {
			delete this.props[propName]
		}
	}

	setSlot({ slotName, children }: { slotName: string, children: BloxContext[] }) {
		if (children && children.length > 0) {
			this.slots[slotName] = children
		} else {
			delete this.slots[slotName]
		}
	}

}
