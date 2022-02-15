import { mount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header', () => {
  it("Headerコンポーネントが存在する", async () => {
    const wrapper = mount(Header)
    const title = wrapper.find('.bar-title')
    expect(title.text()).toBe("Randoom")
  })
})