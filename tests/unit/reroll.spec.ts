import {shallowMount} from '@vue/test-utils'
import App from "@/App.vue"

describe('Can reroll', () => {
  it('when initial roll is completed', () => {
    const wrapper: any = shallowMount(App, {
      propsData: {}
    })

    wrapper.vm.initialRollCompleted()

    expect(wrapper.vm.canReroll).toBeTruthy()
  })

  it('when one reroll completed', () => {
    const wrapper: any = shallowMount(App, {
      propsData: {}
    })

    wrapper.vm.initialRollCompleted()

    wrapper.vm.rerollCompleted()

    expect(wrapper.vm.canReroll).toBeTruthy()
  })
})

describe('Can not reroll', () => {
  it('after two rerolls', () => {
    const wrapper: any = shallowMount(App, {
      propsData: {}
    })
    wrapper.vm.initialRollCompleted()

    wrapper.vm.rerollCompleted()
    wrapper.vm.rerollCompleted()

    expect(wrapper.vm.canReroll).toBeFalsy()
  })

  it('until initial roll is completed', () => {
    const wrapper: any = shallowMount(App, {
      propsData: {}
    })

    expect(wrapper.vm.canReroll).toBeFalsy()
  })

})
