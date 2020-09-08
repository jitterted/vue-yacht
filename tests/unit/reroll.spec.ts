import {shallowMount} from '@vue/test-utils'
import App from "@/App.vue"

describe('Limit rerolls after initial roll', () => {
  it('can reroll', () => {
    const wrapper: any = shallowMount(App, {
      propsData: {}
    })

    wrapper.vm.initialRollCompleted()

    expect(wrapper.vm.canReroll).toBeTruthy()
  })

  it('and one reroll can still reroll', () => {
    const wrapper: any = shallowMount(App, {
      propsData: {}
    })

    wrapper.vm.initialRollCompleted()

    wrapper.vm.rerollCompleted()

    expect(wrapper.vm.canReroll).toBeTruthy()
  })

  it('and after two rerolls can no longer reroll', () => {
    const wrapper: any = shallowMount(App, {
      propsData: {}
    })
    wrapper.vm.initialRollCompleted()

    wrapper.vm.rerollCompleted()
    wrapper.vm.rerollCompleted()

    expect(wrapper.vm.canReroll).toBeFalsy()
  })
})
