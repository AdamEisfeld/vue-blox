/**
 * A view, behaving as a view-model, representing the props / slots to be passed to a BloxComponent.
 * The BloxComponent will inspect the view's type along with the catalog it has been provided to determine
 * which Vue component to render.
 */
export class BloxView {
	type: string = ''
	props: Record<string, any> = {}
	slots: Record<string, BloxView[]> = {}
}
