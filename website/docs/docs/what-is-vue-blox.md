<div class="animate-bounce inline-block"><img src="./logo.svg" class="w-12 m-4 ml-12 max-w-full"/></div>

# What Is Vue Blox?

Vue Blox provides a mechanism for rendering - and updating, in realtime - Vue Components mapped to JS objects. These JS objects could come from:
- Parsing JSON, perhaps from an API call (eg: A/B testing entire page layouts or individual sections)
- Dynamic user-generated content within the browser (eg: A website with UI for designing a page or blog)
- Computed objects built at runtime based on various conditions (eg: dynamic forms)

If you've ever integrated the Slack API into one of your projects, Vue Blox is very similar to Slack's [BlockKit API](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiZ3Ljc4vn7AhVGheAKHbCQB6QQFnoECA0QAQ&url=https://api.slack.com/block-kit&usg=AOvVaw3968Lct0SGECMdK_62GKu0), with a little more power (2-way data binding, mustache templates, plugin support, etc.).

In it's simplest form, Vue Blox allows you to:

- Optionally register Vue Blox globally within your Vue application, via the [registerBlox](/docs/api/composables/register-blox) composable.
- Create a map (or "catalog") of components. The keys of the catalog represent which "type" values correspond to which Vue Components you wish to render, and the values are those components.
- Optionally create a map of variables to provide to your rendered components, allowing you to use the "bind:" specifier within your views to bind props of your components to variables (2-way, allowing you to both provide initial state to your components and have your components update that state as the user interacts with them)
- Create a view (any JS object that has a "type" property with a value corresponding to one of the keys in your catalog). You can nest child views recursively by using the "slot:" specifier and providing a slot name that corresponds to a slot in the actual components that will be rendered.
- Pass your catalog, variables, and view to a [BloxComponent](/docs/api/components/blox-component) to render the components defined in your view / catalog, bound to your variables.
