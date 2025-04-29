import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BookForm from '../BookForm.vue'

describe('BookForm', () => {
  it('emits add-book event with correct data when form is submitted', async () => {
    const wrapper = mount(BookForm)
    
    // Fill in the form
    await wrapper.find('#title').setValue('Test Book')
    await wrapper.find('#author').setValue('Test Author')
    await wrapper.find('#pages').setValue('100')
    await wrapper.find('#status').setValue('reading')
    
    // Submit the form
    await wrapper.find('form').trigger('submit')
    
    // Check if the event was emitted with correct data
    expect(wrapper.emitted('add-book')).toBeTruthy()
    expect(wrapper.emitted('add-book')[0][0]).toEqual({
      title: 'Test Book',
      author: 'Test Author',
      pages: 100,
      status: 'reading'
    })
  })

  it('shows error message when title is empty', async () => {
    const wrapper = mount(BookForm)
    
    // Try to submit without title
    await wrapper.find('form').trigger('submit')
    
    // Check if error message is shown
    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.emitted('add-book')).toBeFalsy()
  })

  it('resets form after successful submission', async () => {
    const wrapper = mount(BookForm)
    
    // Fill in and submit the form
    await wrapper.find('#title').setValue('Test Book')
    await wrapper.find('#author').setValue('Test Author')
    await wrapper.find('#pages').setValue('100')
    await wrapper.find('#status').setValue('reading')
    await wrapper.find('form').trigger('submit')
    
    // Check if form is reset
    expect(wrapper.find('#title').element.value).toBe('')
    expect(wrapper.find('#author').element.value).toBe('')
    expect(wrapper.find('#pages').element.value).toBe('')
    expect(wrapper.find('#status').element.value).toBe('to-read')
  })
}) 