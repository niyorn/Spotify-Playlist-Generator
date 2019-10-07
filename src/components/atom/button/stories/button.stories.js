
import { storiesOf } from '@storybook/vue'
import Button from '../Button.vue'
import ButtonLink from '../ButtonLink.vue'

storiesOf('Button', module)
    .add('Default', () => {
        return {
            components: { Button },
            template: '<Button></Button>'
        }
    })
    .add('With text ', () => {
        return {
            components: { Button },
            template: '<Button>Your Text</Button>'
        }
    })

storiesOf('Button link', module)
    .add('Default', () => {
        return {
            components: { ButtonLink },
            template: '<ButtonLink></ButtonLink>'
        }
    })
    .add('With text - without prop ', () => {
        return {
            components: { ButtonLink },
            template: '<ButtonLink>Your Text</ButtonLink>'
        }
    })
    .add('With text - with prop ', () => {
        return {
            components: { ButtonLink },
            template: '<ButtonLink href="#">Your Text</ButtonLink>'
        }
    })
