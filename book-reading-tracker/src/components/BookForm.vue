<template>
  <form @submit.prevent="handleSubmit" class="book-form">
    <div class="form-group">
      <label for="title">Book Title *</label>
      <input
        type="text"
        id="title"
        v-model="form.title"
        required
        placeholder="Enter book title"
        :class="{ error: v$.title.$error }"
        @blur="v$.title.$touch()"
      />
      <span v-if="v$.title.$error" class="error-message">
        Title is required
      </span>
    </div>

    <div class="form-group">
      <label for="author">Author</label>
      <input
        type="text"
        id="author"
        v-model="form.author"
        placeholder="Enter author name"
      />
    </div>

    <div class="form-group">
      <label for="pages">Total Pages</label>
      <input
        type="number"
        id="pages"
        v-model.number="form.pages"
        min="1"
        placeholder="Enter total pages"
      />
    </div>

    <div class="form-group">
      <label for="status">Reading Status</label>
      <select id="status" v-model="form.status">
        <option value="to-read">To Read</option>
        <option value="reading">Reading</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <button type="submit" class="submit-btn">Save Book</button>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const emit = defineEmits(["add-book"]);

const initialFormState = {
  title: "",
  author: "",
  pages: null,
  status: "to-read",
};

const form = reactive({ ...initialFormState });

const rules = {
  title: { required },
};

const v$ = useVuelidate(rules, form);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    const formData = { ...form };
    resetForm();
    emit("add-book", formData);
  }
};

const resetForm = () => {
  Object.assign(form, initialFormState);
  v$.value.$reset();
};
</script>

<style lang="scss" scoped>
.book-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    input,
    select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background: var(--bg-primary);
      color: var(--text-primary);
      font-size: 1rem;

      &.error {
        border-color: var(--error-color);
      }

      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
      }
    }

    .error-message {
      color: var(--error-color);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  }

  .submit-btn {
    width: 100%;
    padding: 0.75rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: var(--primary-color-dark);
    }
  }
}
</style>
