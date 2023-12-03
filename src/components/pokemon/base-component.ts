// T -  host component, U - elment
export abstract class BaseComponent<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    public constructor(templateId: string,
                       hostElement: string | T,
                       insertAtStart?: boolean
    ) {
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId);
        if (typeof hostElement === "string") {
            this.hostElement = <T>document.getElementById(hostElement);
        } else {
            this.hostElement = hostElement;
        }

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <U>importedNode.firstElementChild;

        this.attach(insertAtStart);
    }

    public attach(insertAtStart: boolean = true) {
        this.hostElement.insertAdjacentElement(
            insertAtStart ? 'afterbegin' : 'beforeend',
            this.element
        );
    }

    abstract configure(): void;

    abstract renderContent(): void;
}
