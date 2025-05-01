import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BookForm from '../BookForm.vue'

describe('BookForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(BookForm)
  })

  it('renders the form with all required fields', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('#title').exists()).toBe(true)
    expect(wrapper.find('#author').exists()).toBe(true)
    expect(wrapper.find('#pages').exists()).toBe(true)
    expect(wrapper.find('#status').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('shows error message when title is empty and form is submitted', async () => {
    const form = wrapper.find('form')
    await form.trigger('submit')
    
    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.find('.error-message').text()).toBe('Title is required')
  })

  it('validates title field is required', async () => {
    const titleInput = wrapper.find('#title')
    await titleInput.setValue('')
    await titleInput.trigger('blur')

    expect(wrapper.find('.error').exists()).toBe(true)
  })

  it('does not show error message when title is filled', async () => {
    const titleInput = wrapper.find('#title')
    await titleInput.setValue('Test Book')
    await titleInput.trigger('blur')

    expect(wrapper.find('.error').exists()).toBe(false)
  })
}) 