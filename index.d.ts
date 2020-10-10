type Renderer = (template: string, locals?: any) => string;
type CompiledRenderer = (locals?: any) => string;

interface TemplateRenderer extends Renderer {
  render: Renderer;
  compile(template: string): CompiledRenderer;
}

declare const template: TemplateRenderer;

export = template;
