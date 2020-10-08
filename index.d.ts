
/**
 * Provides the functionality to process es6 template-strings.
 */
interface IES6Template extends Renderer {
    /**
     * Renders an es6 template-string.
     */
    render: Renderer;

    /**
     * Compiles a template.
     *
     * @param template
     * The template to render.
     *
     * @returns
     * The rendered text.
     */
    compile(template: string): CompiledRenderer;
}


type Renderer =
    /**
     * Renders an es6 template-string.
     *
     * @param template
     * The template to render.
     *
     * @param context
     * The variables to use.
     *
     * @returns
     * The rendered text.
     */
    (template: string, context?: Record<string, unknown>) => string;

/**
 * Represents a compiled renderer.
 */
type CompiledRenderer =
    /**
     * Renders the compiled template.
     *
     * @param context
     * The variables to use.
     *
     * @returns
     * The rendered text.
     */
    (context?: Record<string, unknown>) => string;

/**
 * Provides the functionality to render es6 string-templates.
 */
let template: IES6Template;
export = template;
