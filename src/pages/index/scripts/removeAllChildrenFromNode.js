import {finalPrice} from "./finalPrice";

export function removeAllChildrenFromNode (node = []) {
        let shell;
        // do not copy the contents
        shell = node.cloneNode(false);

        if (node.parentNode) {
            node.parentNode.replaceChild(shell, node);
        }

        return shell;
};
