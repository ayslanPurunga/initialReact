import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useApi from "components/utils/useApi";
import { Formik, Form } from "formik";
import Field from "components/Form/Field/Field";
import Schema from "./Schema";
import "./Form.css";

const initialValue = {
  title: "",
  url: "",
  imageUrl: "",
  price: 0,
};

const PromotionForm = ({ id }) => {
  const history = useHistory();
  const [load, loadInfo] = useApi({
    url: `/promotions/${id}`,
    method: "get",
  });

  const [save, saveInfo] = useApi({
    url: id ? `/promotions/${id}` : "/promotions",
    method: id ? "put" : "post",
    onCompleted: (response) => {
      if (!response.error) {
        history.push("/");
      }
    },
  });

  useEffect(() => {
    if (id) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function onSubmit(formValues) {
    save({
      data: formValues,
    });
  }

  const values = id ? loadInfo.data : initialValue;

  return (
    <div>
      <h1>Promo Show</h1>
      <h2>Nova Promoção</h2>
      {!values ? (
        <div>Carregando...</div>
      ) : (
        <Formik
          initialValues={values}
          onSubmit={onSubmit}
          validationSchema={Schema}
          render={() => (
            <Form>
              {saveInfo.loading && <span>Salvando dados...</span>}
              <div className="promotion-form__group">
                <Field type="text" name="title" label="Título" />
              </div>
              <div className="promotion-form__group">
                <Field type="text" name="url" label="Link" />
              </div>
              <div className="promotion-form__group">
                <Field type="text" name="imageUrl" label="Imagem (URL)" />
              </div>
              <div className="promotion-form__group">
                <Field type="number" name="price" label="Preço" />
              </div>
              <div>
                <button type="submit">Salvar</button>
              </div>
            </Form>
          )}
        />
      )}
    </div>
  );
};

export default PromotionForm;
